"use client";
import userDetails from "@/actions/userDetails"
import { useQuery } from "@tanstack/react-query"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/schema/k12details";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { saveK12Details } from "@/actions/k12details";
export default function K12Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: "",
      grade: "8",
      board: "CBSE",
      stream: "",
      state:'',
      city: "",
      country: "India",
    },
  });
 const { data: user, error, isFetching } = useQuery<any>({ queryKey: ["userDetails"], queryFn: userDetails })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    const res = await saveK12Details(data)
    console.log(res)
    if(res.success){
      toast.success('Saved Successfully')
      redirect('/dashboard')
    }else{
      toast.dismiss('something went wrong')
    }
  };
  if(user?.grade){
    redirect('/dashboard')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8 rounded-lg max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center p-2 ">Welcome to OnBoarding Section of <p className="text-blue-400">Learner</p></h1>
      <div>
        <label>School Name</label>
        <input
          {...register("school")}
          className="w-full border rounded p-2"
          placeholder="Enter school name"
        />
        {errors.school && <p className="text-red-500">{errors.school.message}</p>}
      </div>

      <div>
        <label>Grade</label>
        <Select onValueChange={(value) => setValue("grade", value as any)} defaultValue="8">
          <SelectTrigger>
            <SelectValue placeholder="Select Grade" />
          </SelectTrigger>
          <SelectContent>
            {["8", "9", ].map((grade) => (
              <SelectItem key={grade} value={grade}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
      </div>

      <div>
        <label>Board</label>
        <Select onValueChange={(value) => setValue("board", value as any)} defaultValue="CBSE">
          <SelectTrigger>
            <SelectValue placeholder="Select Board" />
          </SelectTrigger>
          <SelectContent>
            {["CBSE", "ICSE", "State Board", "IB", "IGCSE"].map((board) => (
              <SelectItem key={board} value={board}>
                {board}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.board && <p className="text-red-500">{errors.board.message}</p>}
      </div>

      <div>
        <label>Stream (Optional for 11th & 12th)</label>
        <Select onValueChange={(value) => setValue("stream", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Stream" />
          </SelectTrigger>
          <SelectContent>
            {["Science", "Commerce", "Arts", "None"].map((stream) => (
              <SelectItem key={stream} value={stream}>
                {stream}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label>City</label>
        <input
          {...register("city")}
          className="w-full border rounded p-2"
          placeholder="Enter your city"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      <div>
        <label>State</label>
        <input
          {...register("state")}
          className="w-full border rounded p-2"
          placeholder="Enter your city"
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>

      <div>
        <label>Country</label>
        <Select onValueChange={(value) => setValue("country", value as any)} defaultValue="India">
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {["India", "USA", "UK", "Canada", "Australia"].map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-red-500">{errors.country.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
