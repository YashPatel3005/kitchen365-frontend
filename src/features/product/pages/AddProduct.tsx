import { Button, Input, Label, TextArea } from "@/components";
import { useProductContext } from "@/context/ProductContext";
import { useProducts } from "@/hooks/useProducts";
import { CONSTANTS } from "@/lib/constants";
import { IProduct } from "@/types/product";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const AddProduct = () => {
  const { dispatch, state } = useProductContext();
  const { addProduct } = useProducts();
  const initialValues: IProduct = {
    name: "",
    description: "",
    price: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(CONSTANTS.ERROR_MESSAGE.REQUIRED),
    price: Yup.number()
      .required(CONSTANTS.ERROR_MESSAGE.REQUIRED)
      .min(1, CONSTANTS.ERROR_MESSAGE.PRICE_GREATER),
  });

  const handleSubmit = (values: IProduct) => {
    const payload: IProduct = {
      name: values.name,
      price: values.price,
      ...(values.description && { description: values.description }),
    };
    addProduct(payload);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleBlur, setValues, errors }) => (
          <Form>
            <div className="min-w-125 mx-auto rounded-lg p-2">
              <Label className="text-primary">
                {CONSTANTS.FORM_LABEL.NAME}
              </Label>
              <Input
                type="text"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="Enter Product Name"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                className="mt-1 block w-full border placeholder:text-gray-400 border-neutral-200 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
                error={errors.name}
              />
              {errors.name ? (
                <span className="mt-2 text-red-500">{errors.name}</span>
              ) : (
                ""
              )}
              <div className="mt-5">
                <Label className="text-primary">
                  {CONSTANTS.FORM_LABEL.PRICE}
                </Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setValues({ ...values, price: Number(e.target.value) })
                  }
                  placeholder="Enter Product Price"
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-neutral-200 placeholder:text-gray-400 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
                  error={errors.price}
                />
                {errors.price ? (
                  <span className="mt-2 text-red-500">{errors.price}</span>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-5">
                <Label className="text-primary">
                  {CONSTANTS.FORM_LABEL.DESCRIPTION}
                </Label>
                <TextArea
                  className="w-full placeholder:text-gray-400 text-gray-400"
                  onChange={(value) =>
                    setValues({ ...values, description: value })
                  }
                  placeholder="Enter Product Description"
                  value={values.description}
                  onBlur={handleBlur}
                  error={errors.description}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-7">
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-sm text-white"
                  type="button"
                  onClick={() =>
                    dispatch({ type: "TOGGLE_MODAL", payload: false })
                  }
                  disabled={state.loading}
                >
                  {CONSTANTS.BUTTON_LABEL.CANCEL}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-sm text-white"
                  type="submit"
                  disabled={state.loading}
                >
                  {state.loading
                    ? CONSTANTS.BUTTON_LABEL.LOADING
                    : CONSTANTS.BUTTON_LABEL.ADD}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProduct;
