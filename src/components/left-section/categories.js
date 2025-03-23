import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateFiltersAndSort } from "../../store/products/action";

const Categories = () => {
  const dispatch = useDispatch();
  // Tüm ürünlerin yedeği (filtrelenmemiş olanlar)
  const originalProducts = useSelector(
    (state) => state.products.originalProducts
  );
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Kategori listesini orijinal veriden al
  const category = [
    ...new Set(originalProducts?.map((product) => product.category)),
  ];

  // Checkbox'ın durumunu güncellemek için fonksiyon
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, event.target.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== event.target.name)
      );
    }
  };

  // Filtre güncelleme
  useEffect(() => {
    dispatch(updateFiltersAndSort({ selectedCategories }));
  }, [selectedCategories]);

  console.log(selectedCategories)

  // Filtreleri sıfırla
  const handleResetFilters = () => {
    setSelectedCategories([]);
    dispatch(updateFiltersAndSort({ selectedCategories: [] }));
  };

  return (
    <div
      style={{
        padding: 10,
        marginTop: 10,
        backgroundColor: "#FFF",
      }}
      className="shadow-md rounded-md w-full xs:w-[220px]"
    >
      <FormGroup>
        <FormLabel id="demo-radio-buttons-group-label">Kategoriler</FormLabel>
        <div className="h-[200px] mt-3 overflow-auto flex flex-col">
          {category.map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={selectedCategories?.includes(cat)}
                  onChange={handleCheckboxChange}
                  name={cat}
                />
              }
              label={cat}
            />
          ))}
        </div>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetFilters}
          style={{ marginTop: "10px" }}
        >
          FİLTREYİ SIFIRLA
        </Button>
      </FormGroup>
    </div>
  );
};

export default Categories;
