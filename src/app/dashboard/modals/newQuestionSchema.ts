import * as yup from "yup";

interface NewQuestion {
  question: string;
  options: string[];
}

const schema = yup.object().shape({
  question: yup.string().required("Question is required"),
  options: yup
    .array()
    .of(yup.string().required("Option is required"))
    .min(3, "At least three options are required")
    .max(5, "Maximum of five options allowed"),
});


export default schema;
