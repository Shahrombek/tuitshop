import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AlertMini from "../../components/Alert";
import { pushProduct } from "../../firebase/functions";
import { useSelector } from "react-redux";

const Meal = () => {
  <h1>Mahsulot</h1>;
  const categories = Object.values(useSelector((store) => store.categories));
  const [isLoading, setIsLoading] = useState(false);

  const { register, reset, handleSubmit } = useForm({});

  const submit = (data) => {
    pushProduct(data.category, data, () => {
      reset();
      setIsLoading(true);
    });
  };
  return (
    <>
      <AlertMini open={isLoading} setOpen={setIsLoading} text={"Mahsulot qo'shildi!"} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="row mb-5">
          <div className="col-md-6 mb-3">
            <input className="form-control w-100" placeholder="Mahsulot rasmi" {...register("img", { required: true })}></input>
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control w-100" placeholder="Mahsulot nomi" {...register("productName", { required: true })}></input>
          </div>
          <div className="col-md-12 mb-3">
            <textarea className="form-control textArea w-100" placeholder="Tarif" type="number" {...register("description", { required: true })}></textarea>
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control w-100" placeholder="Narxi" type={"number"} {...register("price", { required: true })}></input>
          </div>
          <div className="col-md-6 mb-3">
            <select className="form-control w-100" placeholder="Mahsulot nomi" name="category" {...register("category", { required: true })}>
              {categories.map((item, i) => (
                <option key={i} className="p-2">
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-center">
          <button className="btn  nav_link active w-25 " type="submit">
            Saqlash
          </button>
        </div>
      </form>
    </>
  );
};

export default Meal;
