/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

import { Form } from "../../../components/ui/form";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import {
  completeFormDefaultValues,
  ROOM_FIELDS,
} from "../Components/RoomReservation/const.room-reservation";
import ExtraServices from "../Components/RoomReservation/ExtraServices";
import GuestInformation from "../Components/RoomReservation/GuestInformation";
import RoomDetailedInformation from "../Components/RoomReservation/RoomDetailedInformation";
import {
  clearRoomDetailedInfomrations,
  clearRoomReservationFullData,
  selectRoomDetailedInfomrations,
  setRoomReservationFullData,
} from "../reportSlices/reportSlice";
import { CompleteSchema, RoomDetailsSchema } from "../zod/room-reservation";

const RoomReservation = () => {
  const form = useForm({
    resolver: zodResolver(CompleteSchema),
    defaultValues: completeFormDefaultValues,
  });

  const dispatch = useAppDispatch();
  const roomDetails = useAppSelector(selectRoomDetailedInfomrations);

  // Handler Function
  const onSubmitHandleRoomDetails = async (
    data: z.infer<typeof RoomDetailsSchema>
  ) => {
    try {
      console.log("data -- sdfsd", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const onSubmitHandleFinalSave = async (
    data: z.infer<typeof CompleteSchema>
  ) => {
    try {
      // make shallow copy, remove all keys in ROOM_FIELDS
      const copy = { ...data } as Record<string, any>;
      ROOM_FIELDS.forEach((k) => delete copy[k]);

      // attach redux roomDetails array (normalize here if needed)
      const payload = {
        ...copy,
        roomDetails: roomDetails || [],
      };

      console.log("refactored payload", payload);
      // send payload...

      dispatch(setRoomReservationFullData(payload));
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };
  const handleFinalClear = async () => {
    try {
      form.reset();
      dispatch(clearRoomDetailedInfomrations());
      dispatch(clearRoomReservationFullData());
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };
  return (
    <div className="min-h-screen  text-sm font-Inter bg-gray-100">
      <div className="p-5 ">
        <h2 className=" font-medium mb-4 text-xl">Room Reservation</h2>

        <div className="bg-white rounded shadow-sm p-5 mb-4">
          <Form {...form}>
            <form>
              {/* ========== SECTION 1: Guest Information ========== */}

              <GuestInformation form={form} />

              {/* ========== SECTION 2: Room Detailed Information ========== */}

              <RoomDetailedInformation
                form={form}
                onSubmitHandleRoomDetails={onSubmitHandleRoomDetails}
              />

              {/* ========== SECTION 3: ========== */}

              <ExtraServices form={form} />

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
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;
