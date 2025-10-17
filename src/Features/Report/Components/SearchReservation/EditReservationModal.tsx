import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { IReservation } from "../../types/search-reservation";

const EditSchema = z.object({
  id: z.number(),
  reserveNo: z.string().nonempty(),
  guestName: z.string().nonempty(),
  mobile: z.string().optional(),
  company: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  reservationStatus: z.string().optional(),
});

type EditValues = z.infer<typeof EditSchema>;

const EditReservationModal = ({
  item,
  onClose,
  onSave,
}: {
  item: IReservation;
  onClose: () => void;
  onSave: (v: EditValues) => void;
}) => {
  const form = useForm<EditValues>({
    resolver: zodResolver(EditSchema),
    defaultValues: item,
  });

  useEffect(() => {
    form.reset(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const submit = (values: EditValues) => {
    onSave(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded shadow max-w-2xl w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Reservation</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <FormField
              control={form.control}
              name="reserveNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reservation No</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="guestName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reservationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reservation Status</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditReservationModal;
