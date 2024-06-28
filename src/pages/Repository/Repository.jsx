import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "./styles";
import api from "../../api/api.config";

const Repository = () => {
  const { repository } = useParams();

  const [loading, setLoading] = useState(true);
  const [actualRepository, setActualRepository] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function load() {
      const repoName = decodeURIComponent(repository);

      const [repositoryData, issuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: "open",
            per_page: 5
          }
        })
      ]);

      setActualRepository(repositoryData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, []);
  return <Container />;
};

export default Repository;
