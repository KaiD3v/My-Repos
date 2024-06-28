import { useParams } from "react-router-dom";

const Repository = () => {
  const { repository } = useParams();
  return (
    <div style={{ color: "#fff" }}>
      <h2>
        {" "}{repository}
      </h2>
    </div>
  );
};

export default Repository;
