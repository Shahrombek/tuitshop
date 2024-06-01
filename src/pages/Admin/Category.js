import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertMini from "../../components/Alert";
import { pushCategory } from "../../firebase/functions";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, reset, handleSubmit } = useForm({});

  const submit = (data) => {
    pushCategory(data.category, () => {
      reset();
      setIsLoading(true);
    });
  };

  return (
    <div>
      <AlertMini open={isLoading} setOpen={setIsLoading} text={"Kategoria qo'shildi!"} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="row mb-5">
          <div className="col-md-12 mb-3">
            <input className="form-control w-100" placeholder="Kategoriya nomi" {...register("category", { required: true })}></input>
          </div>
        </div>
        <div className="text-center">
          <button className="btn nav_link active w-25" type="submit">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
};

export default Category;
