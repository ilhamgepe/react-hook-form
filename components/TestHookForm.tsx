import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValue = {
  firstName: string;
  lastName: string;
  age: Number;
  gender: String;
  developer: Boolean;
};
export let renderCount = 0;
export default function TestHookForm() {
  const [count, setCount] = useState(renderCount);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValue>();

  console.log({ errors, isValid });

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [errors, isValid]);
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="max-w-xl p-3 mx-auto my-2 overflow-hidden bg-green-300 rounded-md"
    >
      <div>render count {count}</div>
      <label htmlFor="firstName" className="mb-5">
        <p>First Name: </p>
        <input
          className="w-full p-2 mt-3 rounded-md outline-none"
          {...register("firstName", { required: "don't you have a name bro?" })}
          type="text"
          id="firstName"
        />
      </label>
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName" className="mb-5">
        <p>Last Name: </p>
        <input
          className="w-full p-2 mt-3 rounded-md outline-none"
          {...register("lastName")}
          type="text"
          id="lastName"
        />
      </label>

      <label htmlFor="age" className="mb-5">
        <p>Age: </p>
        <input
          className="w-full p-2 mt-3 rounded-md outline-none"
          {...register("age", {
            valueAsNumber: true,
            required: "are you ancient?",
            max: { value: 120, message: "Are you imortal?" },
          })}
          type="number"
          id="age"
        />
      </label>
      {errors?.age && <p>{errors?.age?.message}</p>}

      {/* select */}
      <select
        {...register("gender")}
        className="block w-full px-2 py-1 my-3 text-sm font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded-md appearance-none form-select form-select-sm bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">Please don&apos;t choose the third one</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
        <option value="3">other</option>
      </select>

      <label htmlFor="developer" className="flex items-center mb-5 space-x-3">
        <input
          className=""
          {...register("developer")}
          type="checkbox"
          id="developer"
        />
        <p>Are you a developer? </p>
      </label>

      <button
        type="submit"
        className="w-full p-3 font-bold tracking-widest text-white bg-indigo-500 rounded-lg hover:brightness-95"
      >
        Submit
      </button>
    </form>
  );
}
