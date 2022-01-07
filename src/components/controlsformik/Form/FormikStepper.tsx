/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SendIcon from "@mui/icons-material/Send";
import { Button, CircularProgress, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import * as React from "react";

export interface IFormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: IFormikStepProps): JSX.Element {
  return <>{children} </>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>): JSX.Element {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<IFormikStepProps>[];

  const [step, setStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<IFormikStepProps>;

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (step === childrenArray.length - 1) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting, values, errors, status }) => (
        <Form autoComplete="off">
          <Stepper
            alternativeLabel
            activeStep={step}
            sx={{
              marginTop: "24px",
              marginBottom: "24px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "8px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {!status && step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setStep((s) => s - 1)}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Voltar
                </Button>
              </Grid>
            ) : null}
            {!status && (
              <Grid item>
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  endIcon={
                    isLastStep() && !isSubmitting ? (
                      <SendIcon />
                    ) : (
                      <NavigateNextIcon />
                    )
                  }
                >
                  {isSubmitting
                    ? "Submitting"
                    : isLastStep()
                    ? "Enviar"
                    : "Próximo"}
                </Button>
              </Grid>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

/*    <pre>{JSON.stringify({ values }, null, 4)}</pre> */
