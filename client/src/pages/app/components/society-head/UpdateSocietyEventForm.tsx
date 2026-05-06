import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, MapPin, Clock, Tag, ImageIcon } from "lucide-react";

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
import { useUpdateEvent } from "../../hooks/society-head/useSocietyHead";
import {
  CreateEventInput,
  createSocietyEventSchema,
} from "../../validators/society-head/society-head.validator";

type UpdateSocietyEventFormProps = {
  event: MySocietyEvent;
  societyId: string;
};

const UpdateSocietyEventForm = ({
  event,
  societyId,
}: UpdateSocietyEventFormProps) => {
  const [eventImage, setEventImage] = useState<File | null>(null);

  const { mutate, isPending } = useUpdateEvent(societyId, event.id);

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createSocietyEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description || "",
      location: event.location || "",
      startTime: event.startTime,
      endTime: event.endTime || "",
      status: event.status || "upcoming",
    },
  });

  function onSubmit(values: CreateEventInput) {
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

  // Helpers to convert ISO <-> datetime-local string
  const toLocalInput = (iso: string) =>
    iso ? new Date(iso).toISOString().slice(0, 16) : "";

  const toISOString = (local: string) =>
    local ? new Date(local).toISOString() : "";

  return (
    <div className="min-h-screen bg-slate-50/50 darks:bg-slate-950/50 animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-2.5 darks:bg-indigo-900/30">
              <CalendarDays className="h-6 w-6 text-indigo-600 darks:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 darks:text-slate-100">
              Update Event
            </h1>
          </div>
          <p className="text-slate-500 darks:text-slate-400">
            Modify your existing event details.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>
                  Update the main content of your event.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Event Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[160px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Schedule & Location */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <CardTitle>Schedule & Location</CardTitle>
                </div>
                <CardDescription>
                  Update when and where the event takes place.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            className="h-11 pl-9"
                            placeholder="e.g., Community Hall, Block A"
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
                        <FormLabel>
                          Start Time <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="h-11"
                            value={toLocalInput(field.value)}
                            onChange={(e) =>
                              field.onChange(toISOString(e.target.value))
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
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="h-11"
                            value={toLocalInput(field.value ?? "")}
                            onChange={(e) =>
                              field.onChange(toISOString(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Must be after the start time.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-slate-500" />
                  <CardTitle>Update Image</CardTitle>
                </div>
                <CardDescription>
                  Upload a new image to replace the existing one.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {event.image && !eventImage && (
                  <img
                    src={event.image}
                    alt="Current event cover"
                    className="mb-4 rounded-lg max-h-60 w-full object-cover"
                  />
                )}

                <ImageUploader
                  setImageFile={(file) => setEventImage(file)}
                  title="Replace Event Cover"
                />
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-slate-500" />
                  <CardTitle>Event Status</CardTitle>
                </div>
                <CardDescription>
                  Update the current status of this event.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  form.reset({
                    title: event.title,
                    description: event.description || "",
                    location: event.location || "",
                    startTime: event.startTime,
                    endTime: event.endTime || "",
                    status: event.status || "upcoming",
                  });
                  setEventImage(null);
                }}
              >
                Reset
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Event"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateSocietyEventForm;
