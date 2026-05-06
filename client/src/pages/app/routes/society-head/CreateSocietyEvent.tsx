import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, ImageIcon, MapPin, Clock, Tag } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ImageUploader from "@/components/ImageUploader";
import { useCreateEvent } from "../../hooks/society-head/useSocietyHead";
import { useParams } from "react-router-dom";
import {
  CreateEventInput,
  createSocietyEventSchema,
} from "../../validators/society-head/society-head.validator";

export default function CreateSocietyEvent() {
  const { id } = useParams();
  const [eventImage, setEventImage] = useState<File | null>(null);

  const { mutate, isPending } = useCreateEvent(id as string);

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createSocietyEventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      status: "upcoming",
    },
  });

  async function onSubmit(values: CreateEventInput) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("location", values.location || "");
    formData.append("startTime", values.startTime);
    formData.append("endTime", values.endTime || "");
    formData.append("status", values.status || "upcoming");

    if (eventImage) {
      formData.append("image", eventImage);
    }

    mutate(formData);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 darks:bg-slate-950/50 animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-2.5 darks:bg-indigo-900/30">
              <CalendarDays className="h-6 w-6 text-indigo-600 darks:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 darks:text-slate-100">
              Create Event
            </h1>
          </div>
          <p className="text-slate-500 darks:text-slate-400">
            Schedule a new event or activity for your society members.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Core Content Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <CalendarDays className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Event Details</CardTitle>
                    <CardDescription>
                      The main information visible to all residents.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 p-5 sm:p-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                        Event Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Annual Sports Day 2026"
                          className="h-11 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[160px] resize-y bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800 text-base"
                          placeholder="Write the full details of your event here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Location & Time Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <Clock className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Schedule & Location
                    </CardTitle>
                    <CardDescription>
                      When and where the event will take place.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 p-5 sm:p-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                        Location
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="e.g., Community Hall, Block A"
                            className="h-11 pl-9 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                          Start Time <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="h-11 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800"
                            {...field}
                            onChange={(e) => {
                              // Convert local datetime to ISO string
                              const val = e.target.value;
                              field.onChange(
                                val ? new Date(val).toISOString() : "",
                              );
                            }}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                          End Time
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="h-11 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800"
                            {...field}
                            onChange={(e) => {
                              const val = e.target.value;
                              field.onChange(
                                val ? new Date(val).toISOString() : "",
                              );
                            }}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-slate-500">
                          Must be after the start time.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <ImageIcon className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Header Image</CardTitle>
                    <CardDescription>
                      Optional visual context to make your event stand out.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 p-5 sm:p-6">
                <ImageUploader
                  setImageFile={(file) => setEventImage(file)}
                  title="Upload Event Cover"
                />
              </CardContent>
            </Card>

            {/* Status Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <Tag className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Event Status</CardTitle>
                    <CardDescription>
                      Set the current status of this event.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 p-5 sm:p-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-sm text-slate-500">
                        Defaults to "Upcoming" for newly created events.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Actions */}
            <div className="sticky bottom-6 z-10 flex items-center justify-end gap-4 rounded-xl border border-slate-200 darks:border-slate-800 bg-white/80 darks:bg-slate-950/80 p-5 shadow-lg backdrop-blur-md">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="text-slate-600 hover:bg-slate-100 darks:text-slate-400 darks:hover:bg-slate-800 font-medium h-11"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to cancel? All unsaved data will be lost.",
                    )
                  ) {
                    form.reset();
                    setEventImage(null);
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="h-11 min-w-[160px] bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 darks:bg-indigo-600 darks:hover:bg-indigo-500 transition-all"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Event"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
