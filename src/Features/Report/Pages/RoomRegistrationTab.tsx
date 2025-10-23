/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import {
  clearRoomDetailedInfomrationsForRegistration,
  clearRoomRegistrationFullData,
  selectRoomDetailedInfomrationsForRegistration,
  setRoomRegistrationFullData,
} from "../reportSlices/reportSlice";

import { useEffect } from "react";
import { toast } from "sonner";
import AdditionalInformationRegistration from "../Components/RoomRegistrationTab/AdditionalInformationRegistration";
import {
  completeFormDefaultValuesForRegistration,
  ROOM_FIELDS_REGISTRATION,
} from "../Components/RoomRegistrationTab/const.room-registration";
import GuestDetailsRegistration from "../Components/RoomRegistrationTab/GuestDetailsRegistration";
import RoomDetailedInformationRegistration from "../Components/RoomRegistrationTab/RoomDetailedInformationRegistration";
import {
  CompleteSchemaRegistration,
  RoomDetailsSchemaRegistration,
} from "../zod/room-registration";

const RoomRegistrationTab = () => {
  const form = useForm({
    resolver: zodResolver(CompleteSchemaRegistration),
    mode: "onChange",
    defaultValues: {
      ...completeFormDefaultValuesForRegistration,
      checkInTime: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      departureTime: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
  });

  const dispatch = useAppDispatch();
  const roomDetails = useAppSelector(
    selectRoomDetailedInfomrationsForRegistration
  );

  // Handler Function
  const onSubmitHandleRoomDetails = async (
    data: z.infer<typeof RoomDetailsSchemaRegistration>
  ) => {
    try {
      console.log("Room details data -- ", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const onSubmitHandleFinalSave = async (
    data: z.infer<typeof CompleteSchemaRegistration>
  ) => {
    try {
      if (!roomDetails || roomDetails.length === 0) {
        toast.error("Please add roomDetails");
        return;
      }

      // make shallow copy, remove all keys in ROOM_FIELDS_REGISTRATION
      const copy = { ...data } as Record<string, any>;
      ROOM_FIELDS_REGISTRATION.forEach((k) => delete copy[k]);

      // attach redux roomDetails array (normalize here if needed)
      const payload = {
        ...copy,
        roomDetails: roomDetails || [],
      };

      console.log("Room Registration payload", payload);
      // send payload...

      dispatch(setRoomRegistrationFullData(payload));
      dispatch(clearRoomDetailedInfomrationsForRegistration());
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const handleFinalClear = async () => {
    try {
      form.reset();
      dispatch(clearRoomDetailedInfomrationsForRegistration());
      dispatch(clearRoomRegistrationFullData());
    } catch (error) {
      console.error("Error clearing form:", error);
      throw error;
    }
  };

  useEffect(() => {
    dispatch(clearRoomDetailedInfomrationsForRegistration());
  }, [dispatch]);

  return (
    <div className="min-h-screen text-sm font-Inter bg-gray-100">
      <div className="p-5">
        <h2 className="font-medium mb-4 text-xl">Room Registration</h2>

        <div className="bg-white rounded shadow-sm p-5 mb-4">
          <Form {...form}>
            <form>
              {/* ========== SECTION 1: Guest Details ========== */}
              <GuestDetailsRegistration form={form} />

              {/* ========== SECTION 2: Room Detailed Information ========== */}
              <RoomDetailedInformationRegistration
                form={form}
                onSubmitHandleRoomDetails={onSubmitHandleRoomDetails}
              />

              {/* ========== SECTION 3: Additional Information ========== */}
              <AdditionalInformationRegistration form={form} />

              {/* ========== FINAL SAVE BUTTON ========== */}
              <div className="flex justify-center gap-1 items-center">
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

              <div className="flex justify-between">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Check-In
                </Button>
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RoomRegistrationTab;
