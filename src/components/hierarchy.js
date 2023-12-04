import { useState } from "react";

/**
 * Product row that will represent in product table
 * @param {object} product - the product object
 * @returns {React.JSX.Element}
 */
function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

/**
 * Category name that will represent in product table
 * @param {string} category - category name
 * @returns {React.JSX.Element}
 */
function CategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

/**
 * The component that containt the list of products and categories
 * @param {Array.<object>} product - list of products
 * @param {string} searchedText - the text that user has provided to search for
 * @returns {React.JSX.Element}
 */
function ProductTable({ products, searchedText, inStockOnly }) {
  const rows = [];
  let previousCategory = null;
  products.forEach((product) => {
    // checking if there is a searched text first, if it is,
    // passing products that are not in the searched text.
    if (
      searchedText &&
      product.name.toLowerCase().indexOf(searchedText.toLowerCase()) === -1
    ) {
      return;
    }
    // checking if filter for stocked items exists, if it is,
    // passing items that do not have stocked.
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== previousCategory) {
      rows.push(
        <CategoryRow category={product.category} key={product.category} />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    previousCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  searchedText,
  inStockOnly,
  onSearchedTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchedText}
        onChange={(e) => onSearchedTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProduct({ products }) {
  const [searchedText, setSearchedText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        searchedText={searchedText}
        inStockOnly={inStockOnly}
        onSearchedTextChange={setSearchedText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        searchedText={searchedText}
        inStockOnly={inStockOnly}
        onSearchedTextChange={setSearchedText}
        onInStockOnlyChange={setInStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function Main() {
  return <FilterableProduct products={PRODUCTS} />;
}
