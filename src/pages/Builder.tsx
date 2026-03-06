import CVFormDynamic from "../component/form/CvFromDynamic";

function Builder() {
  return (
    <CVFormDynamic
      formType="Type 1"
      onDataUpdate={(data) => console.log(data)}
    />
  );
}

export default Builder;
