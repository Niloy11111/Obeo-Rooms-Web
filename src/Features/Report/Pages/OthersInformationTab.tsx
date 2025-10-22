import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";

import CreditCardInformation from "../Components/OthersInformationTab/CreditCardInformation";
import DepartureInformation from "../Components/OthersInformationTab/DepartureInformation";
import OtherInformation from "../Components/OthersInformationTab/OtherInformation";
import { formDefaultValuesForOthersInformation } from "../Components/OthersInformationTab/const.others-information";
import { OthersInformationSchema } from "../zod/others-information";

const OthersInformationTab = () => {
  const form = useForm({
    resolver: zodResolver(OthersInformationSchema),
    defaultValues: formDefaultValuesForOthersInformation,
  });

  const onSubmitHandleSave = async (
    data: z.infer<typeof OthersInformationSchema>
  ) => {
    try {
      console.log("Others Information payload", data);
      // send payload...
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const handleClear = () => {
    form.reset(formDefaultValuesForOthersInformation);
  };

  return (
    <div className="min-h-screen text-sm font-Inter bg-gray-100">
      <div className="p-5">
        <h2 className="font-medium mb-4 text-xl">Others Information</h2>

        <div className="bg-white rounded shadow-sm p-5 mb-4">
          <Form {...form}>
            <form>
              {/* ========== SECTION 1: Other Information ========== */}
              <OtherInformation form={form} />

              {/* ========== SECTION 2: Departure Information ========== */}
              <DepartureInformation form={form} />

              {/* ========== SECTION 3: Credit Card Information ========== */}
              <CreditCardInformation form={form} />

              {/* ========== SAVE AND CLEAR BUTTONS ========== */}
              <div className="flex justify-center gap-2 items-center mt-6">
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmitHandleSave)}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 text-white"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={handleClear}
                  className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white"
                >
                  Clear
                </Button>
              </div>

              {/* ========== NAVIGATION BUTTONS ========== */}
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
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OthersInformationTab;
