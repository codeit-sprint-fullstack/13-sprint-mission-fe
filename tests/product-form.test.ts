import assert from 'node:assert/strict';
import test from 'node:test';

type ProductFormState = {
  parseProductPrice?: (value: string) => number | null;
};

async function loadProductFormState(): Promise<ProductFormState> {
  try {
    return (await import('../src/app/components/product-form-state.ts')) as ProductFormState;
  } catch {
    return {};
  }
}

test('required product price rejects blank and non-finite values', async () => {
  const { parseProductPrice } = await loadProductFormState();
  assert.equal(typeof parseProductPrice, 'function');
  if (!parseProductPrice) return;

  assert.equal(parseProductPrice(''), null);
  assert.equal(parseProductPrice('   '), null);
  assert.equal(parseProductPrice('-1'), null);
  assert.equal(parseProductPrice('Infinity'), null);
});

test('an explicitly entered zero remains a valid product price', async () => {
  const { parseProductPrice } = await loadProductFormState();
  assert.equal(typeof parseProductPrice, 'function');
  if (!parseProductPrice) return;

  assert.equal(parseProductPrice('0'), 0);
  assert.equal(parseProductPrice('1000'), 1000);
});
