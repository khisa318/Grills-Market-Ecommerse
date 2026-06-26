const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  /**
   * Fetch all products from SQLite, with an optional search string filter
   */
  async getProducts(searchQuery = "") {
    try {
      const url = searchQuery 
        ? `${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}/products`;
        
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was unstable");
      return await response.json();
    } catch (error) {
      console.error("Failed fetching products matrix:", error);
      throw error;
    }
  },

  /**
   * Fetch a single product detail card using its text slug identifier
   */
  async getProductBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${slug}`);
      if (!response.ok) throw new Error(`Product ${slug} details missing`);
      return await response.json();
    } catch (error) {
      console.error(`Error querying detail route for ${slug}:`, error);
      throw error;
    }
  }
};