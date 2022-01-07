/* eslint-disable react/jsx-props-no-spreading */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { fetchRequestWorkFlow } from "../../services/data/RequestServices";
import WorkflowResponsableTable from "./WorkflowResponsableTable";

interface IProps {
  request_id: string;
}

export interface INewStep {
  id: number;
  status: string;
  statusObservation: string;
  text: "";
  isCurrent: boolean;
  isRequired: boolean;
  isConcluded: boolean;
  statusDate: Date;
  concludedOn: Date;
  responsables: {
    isDone: boolean;
    doneBy: string;
    group: string;
    users: string[];
    doneCount: number;
    doingCount: number;
  }[];
}

export default function WorkFlowSteps({ request_id }: IProps): JSX.Element {
  const [isCancelled, setIsCancelled] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<INewStep[]>([]);
  const steps: INewStep[] = [];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  async function fetchData() {
    const data = await fetchRequestWorkFlow(request_id);
    console.log("no form", data);

    if (!isCancelled) {
      data.forEach((element: any) => {
        if (element.isRequired) {
          steps.push(element);
        }
      });
      setInitialData(steps);
      console.log(data);

      const pos = steps.findIndex((value: any) => value.isInitial);
      if (pos === -1) setActiveStep(0);
      else setActiveStep(pos);
      console.log("posição corrente", pos);
      console.log("definiu initial data", data);
    }
  }

  React.useEffect(() => {
    setIsCancelled(false);
    fetchData();
    console.log("terminou de carregar");

    return () => {
      console.log("entrou no cancelado");
      setIsCancelled(true);
    };
  }, []);

  const isStepOptional = (step: number) => {
    return true;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) =>
      prevActiveStep + 1 === initialData.length ? 0 : prevActiveStep + 1
    );
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {initialData && (
        <Stepper
          activeStep={activeStep || 0}
          sx={{
            marginTop: "24px",
            marginBottom: "24px",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {initialData.map((value, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (value.statusObservation) {
              labelProps.optional = (
                <Typography variant="caption">
                  {value.statusObservation}
                </Typography>
              );
            }

            if (isStepSkipped(index)) {
              stepProps.completed = value.isConcluded;
            }
            stepProps.completed = value.isConcluded;

            return (
              <Step key={value.status} {...stepProps} color="success">
                <StepLabel {...labelProps}>{value.status}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {activeStep === initialData.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {initialData[activeStep].text}
            <WorkflowResponsableTable rows={initialData[activeStep]} />
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
