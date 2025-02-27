import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/Button/Button";

import { LoaderCircle } from "lucide-react";
import { updateMovie } from "../../../apis/moviesAPI";

const movieSchema = object({
  tenPhim: string().required("Epmty. Please fill this sign."),
  trailer: string().required("Epmty. Please fill this sign."),
  moTa: string().required("Epmty. Please fill this sign."),
  ngayKhoiChieu: string().required("Epmty. Please fill this sign."),
  biDanh: string().required("Epmty. Please fill this sign."),
  danhGia: string()
    .required("Epmty. Please fill this sign.")
    .matches(/^(?:10|[0-9])$/, "Only react from 0 to 10."),
});

const MovieForm = (data) => {
  const {
    maPhim,
    hinhAnh,
    biDanh,
    tenPhim,
    danhGia,
    maNhom,
    moTa,
    ngayKhoiChieu,
    trailer,
  } = data;

  const [inputArray, setInputArray] = useState([
    {
      name: "Name",
      value: "tenPhim",
    },
    {
      name: "Trailer",
      value: "trailer",
    },
    {
      name: "Description",
      value: "moTa",
    },
    {
      name: "Release Date",
      value: "ngayKhoiChieu",
    },
    {
      name: "Code",
      value: "biDanh",
    },
    {
      name: "Rate Scores",
      value: "danhGia",
    },
  ]);
  const [submit, setSubmit] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChangePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setPreview(file);
    }
  };

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview.preview);
    };
  }, [preview]);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: maNhom || "",
      ngayKhoiChieu: "",
      biDanh: "",
      danhGia: "",
    },
    resolver: yupResolver(movieSchema),
    mode: "onTouched",
  });

  const onSubmit = async (payload) => {
    setSubmit(true);
    try {
      const formData = new FormData();
      formData.append("maPhim", maPhim);
      formData.append("tenPhim", payload.tenPhim);
      formData.append("trailer", payload.trailer);
      formData.append("moTa", payload.moTa);
      formData.append("ngayKhoiChieu", payload.ngayKhoiChieu);
      formData.append("biDanh", payload.biDanh);
      formData.append("danhGia", payload.danhGia);
      return await updateMovie(formData);
    } catch (error) {
      throw new Error(error?.resposne?.message);
    } finally {
      setSubmit(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (data) {
      setValue("tenPhim", tenPhim);
      setValue("trailer", trailer);
      setValue("moTa", moTa);
      setValue("ngayKhoiChieu", ngayKhoiChieu);
      setValue("biDanh", biDanh);
      setValue("danhGia", danhGia);
    }
  }, [data]);

  return (
    <div className="flex w-full flex-col justify-center gap-2 overflow-y-auto lg:flex-row lg:gap-5">
      <div className="flex items-center justify-center overflow-hidden">
        <img
          width={500}
          height={500}
          className="rounded-3xl"
          src={preview ? preview.preview : hinhAnh}
          alt={biDanh}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 lg:gap-4"
      >
        <div className="flex flex-col items-center gap-2 py-2 lg:items-start lg:gap-4">
          <p>
            <span className="rounded-lg bg-secondary-default p-2 text-white">
              {maPhim}
            </span>
          </p>
          <h3 className="overflow-hidden truncate whitespace-nowrap">
            {tenPhim}
          </h3>
        </div>
        <div className="flex max-w-full flex-col gap-2 lg:gap-4">
          {inputArray.map((item) => (
            <div
              key={item.name}
              className="flex max-w-full items-center justify-center"
            >
              <input
                className={`w-full rounded-full border border-secondary-default px-4 py-2 shadow-inner outline-none transition-all focus:shadow-secondary-default ${errors[item.value] && "border-red-500 focus:shadow-red-500"}`}
                type="text"
                placeholder={item.name}
                {...register(item.value)}
              />
            </div>
          ))}
        </div>
        <input
          onChange={handleChangePreview}
          className="input-file input-file-secondary"
          type="file"
        />
        <Button
          disabled={submit}
          type="submit"
          className={`max-w-[200px] flex-shrink-0 text-white justify-center items-center`}
        >
          {submit ? <LoaderCircle className="animate-spin" /> : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default MovieForm;
