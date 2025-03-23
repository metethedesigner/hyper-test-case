import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateFiltersAndSort,
} from "../../store/products/action";
import { Button } from "@mui/material";

const SortBy = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  //Seçilen sort işlemi için istek fonksiyonu
  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    setSelectedValue(sortBy);

    dispatch(updateFiltersAndSort({ sortBy: sortBy }));
  };

  //Seçilen filtreyi kaldırmak için istek fonksiyonu
  const handleResetFilters = () => {
    setSelectedValue("");

    dispatch(updateFiltersAndSort({ sortBy: "" }));
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
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Sırala</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedValue}
          name="radio-buttons-group"
          onChange={handleSortChange}
        >
          <FormControlLabel
            value="price-high-to-low"
            control={<Radio />}
            label="Pahalıdan Ucuza"
          />
          <FormControlLabel
            value="price-low-to-high"
            control={<Radio />}
            label="Ucuzdan Pahalıya"
          />
        </RadioGroup>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetFilters}
          style={{ marginTop: "10px" }}
        >
          FİLTREYİ SIFIRLA
        </Button>
      </FormControl>
    </div>
  );
};

export default SortBy;
