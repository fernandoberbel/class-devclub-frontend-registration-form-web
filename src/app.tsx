import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import "./styles/global.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  email: z.string().email(),
  dateOfBirth: z.object({
    month: z.string().optional(),
    day: z.string().optional(),
    year: z.string().optional(),
  }),
});

type FormData = z.infer<typeof schema>;

export function App() {
  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-100">
      <div className="w-full max-w-2xl rounded-md bg-white p-8 shadow">
        <h1 className="text-center text-2xl font-bold">Registration</h1>
        <form
          className="mt-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First name</Label>
              <Input type="text" {...register("firstName")} />

              {formState.errors.firstName?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.firstName?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Last name</Label>
              <Input type="text" {...register("lastName")} />

              {formState.errors.lastName?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.lastName?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>E-mail</Label>
              <Input type="email" {...register("email")} />

              {formState.errors.email?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.email?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Company</Label>
              <Input type="text" {...register("company")} />

              {formState.errors.company?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.company?.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 items-end gap-4">
            <div>
              <Label>Date of birth</Label>
              <Select {...register("dateOfBirth.month")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array(12)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1);
                      return (
                        <SelectItem key={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>

              {formState.errors.dateOfBirth?.month?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.dateOfBirth?.month?.message}
                </span>
              )}
            </div>
            <div>
              <Select {...register("dateOfBirth.day")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array(31)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1);
                      return (
                        <SelectItem key={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>

              {formState.errors.dateOfBirth?.day?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.dateOfBirth?.day?.message}
                </span>
              )}
            </div>
            <div>
              <Select {...register("dateOfBirth.year")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array(200)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1901);
                      return (
                        <SelectItem key={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>

              {formState.errors.dateOfBirth?.year?.message && (
                <span className="text-xs text-red-500">
                  {formState.errors.dateOfBirth?.year?.message}
                </span>
              )}
            </div>
          </div>

          <Button type="submit" className="mt-8">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
