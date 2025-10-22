/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import {
  clearGuestDetailsData,
  clearGuestDetailsFullData,
  selectGuestDetailsData,
  setGuestDetailsFullData,
} from "../reportSlices/reportSlice";

import {
  completeFormDefaultValuesForGuestDetails,
  GUEST_FIELDS,
} from "../Components/GuestDetailsTab/const.guest-details";
import GuestDetailsHeader from "../Components/GuestDetailsTab/GuestDetailsHeader";
import IndividualGuestInformation from "../Components/GuestDetailsTab/IndividualGuestInformation";
import {
  CompleteSchemaGuestDetails,
  GuestDetailsSchema,
} from "../zod/guest-details";

const GuestDetailsTab = () => {
  const form = useForm({
    resolver: zodResolver(CompleteSchemaGuestDetails),
    defaultValues: completeFormDefaultValuesForGuestDetails,
  });

  const dispatch = useAppDispatch();
  const guestDetails = useAppSelector(selectGuestDetailsData);

  // Handler Function
  const onSubmitHandleGuestDetails = async (
    data: z.infer<typeof GuestDetailsSchema>
  ) => {
    try {
      console.log("Guest details data -- ", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const onSubmitHandleFinalSave = async (
    data: z.infer<typeof CompleteSchemaGuestDetails>
  ) => {
    try {
      // make shallow copy, remove all keys in GUEST_FIELDS
      const copy = { ...data } as Record<string, any>;
      GUEST_FIELDS.forEach((k) => delete copy[k]);

      // attach redux guestDetails array (normalize here if needed)
      const payload = {
        ...copy,
        guestDetails: guestDetails || [],
      };

      console.log("Guest Details payload", payload);
      // send payload...

      dispatch(setGuestDetailsFullData(payload));
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const handleFinalClear = async () => {
    try {
      form.reset();
      dispatch(clearGuestDetailsData());
      dispatch(clearGuestDetailsFullData());
    } catch (error) {
      console.error("Error clearing form:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen text-sm font-Inter bg-gray-100">
      <div className="p-5">
        <h2 className="font-medium mb-4 text-xl">Guest Details</h2>

        <div className="bg-white rounded shadow-sm p-5 mb-4">
          <Form {...form}>
            <form>
              {/* ========== SECTION 1: Guest Details Header ========== */}
              <GuestDetailsHeader form={form} />

              {/* ========== SECTION 2: Individual Guest Information ========== */}
              <IndividualGuestInformation
                form={form}
                onSubmitHandleGuestDetails={onSubmitHandleGuestDetails}
              />

              {/* ========== FINAL SAVE BUTTON ========== */}
              <div className="flex justify-center gap-1 items-center mt-6">
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmitHandleFinalSave)}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 text-white"
                >
                  Save All
                </Button>
                <Button
                  type="button"
                  onClick={handleFinalClear}
                  className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white"
                >
                  Clear
                </Button>
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Check-In
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsTab;
