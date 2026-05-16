import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/profile-edit-dialog.js';
import type { ProfileEditDialog } from '../src/profile-edit-dialog.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

async function dialog(
  mode: 'create' | 'clone' | 'rename',
  existingName = '',
  existingNames: string[] = [],
): Promise<ProfileEditDialog> {
  return mount('profile-edit-dialog', { mode, existingName, existingNames });
}

function setInput(el: ProfileEditDialog, name: string, value: string): void {
  const input = el.shadowRoot!.querySelector<HTMLInputElement>(`input[name="${name}"]`)!;
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

function click(el: ProfileEditDialog, selector: string): void {
  el.shadowRoot!.querySelector<HTMLButtonElement>(selector)!.click();
}

describe('profile-edit-dialog', () => {
  it('create mode renders empty name + description inputs', async () => {
    const el = await dialog('create');
    expect(el.shadowRoot!.querySelector('h3')!.textContent).toContain('New profile');
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('input[name="name"]')!.value).toBe('');
    expect(
      el.shadowRoot!.querySelector<HTMLInputElement>('input[name="description"]'),
    ).not.toBeNull();
  });

  it('rename mode pre-fills the name and hides description', async () => {
    const el = await dialog('rename', 'away');
    expect(el.shadowRoot!.querySelector('h3')!.textContent).toContain('Rename');
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('input[name="name"]')!.value).toBe(
      'away',
    );
    expect(el.shadowRoot!.querySelector('input[name="description"]')).toBeNull();
  });

  it('clone mode shows the source profile name', async () => {
    const el = await dialog('clone', 'home');
    expect(el.shadowRoot!.querySelector('.source')!.textContent).toContain('home');
  });

  it('save with empty name shows an error and does not emit dialog-save', async () => {
    const el = await dialog('create');
    const fire = vi.fn();
    el.addEventListener('dialog-save', fire);
    setInput(el, 'name', '   ');
    click(el, '.button.primary');
    await el.updateComplete;
    expect(fire).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('.error')!.textContent).toContain('Name');
  });

  it('save with a colliding name (and not the same as existingName) shows an error', async () => {
    const el = await dialog('create', '', ['home', 'away']);
    const fire = vi.fn();
    el.addEventListener('dialog-save', fire);
    setInput(el, 'name', 'home');
    click(el, '.button.primary');
    await el.updateComplete;
    expect(fire).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('.error')!.textContent).toContain('already exists');
  });

  it('rename to the same name is allowed (no-op rename emits a dialog-save)', async () => {
    const el = await dialog('rename', 'away', ['home', 'away']);
    const fire = vi.fn();
    el.addEventListener('dialog-save', fire);
    click(el, '.button.primary');
    await el.updateComplete;
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({ name: 'away', description: '' });
  });

  it('save with a valid name emits dialog-save with trimmed name + description', async () => {
    const el = await dialog('create');
    const fire = vi.fn();
    el.addEventListener('dialog-save', fire);
    setInput(el, 'name', '  weekend ');
    setInput(el, 'description', '  Sat + Sun  ');
    click(el, '.button.primary');
    await el.updateComplete;
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({ name: 'weekend', description: 'Sat + Sun' });
  });

  it('cancel emits dialog-cancel', async () => {
    const el = await dialog('create');
    const fire = vi.fn();
    el.addEventListener('dialog-cancel', fire);
    click(el, '.button.secondary');
    await el.updateComplete;
    expect(fire).toHaveBeenCalledOnce();
  });

  it('Enter key in name input saves; Escape cancels', async () => {
    const el = await dialog('create');
    const save = vi.fn();
    const cancel = vi.fn();
    el.addEventListener('dialog-save', save);
    el.addEventListener('dialog-cancel', cancel);
    setInput(el, 'name', 'weekend');
    const nameInput = el.shadowRoot!.querySelector<HTMLInputElement>('input[name="name"]')!;
    nameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(save).toHaveBeenCalledOnce();
    nameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(cancel).toHaveBeenCalledOnce();
  });
});
