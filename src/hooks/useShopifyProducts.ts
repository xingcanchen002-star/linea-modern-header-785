import { useState, useEffect } from 'react';
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify';

export function useShopifyProducts(first: number = 20, query?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query: query || null });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [first, query]);

  return { products, loading, error };
}

export function useShopifyProduct(handle: string | undefined) {
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          setProduct(data.data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}
