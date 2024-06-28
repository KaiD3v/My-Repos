import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Owner, Loading, BackButton } from "./styles";
import api from "../../api/api.config";
import { FaArrowLeft } from "react-icons/fa";

const Repository = () => {
  const { repository } = useParams();

  const [loading, setLoading] = useState(false);
  const [actualRepository, setActualRepository] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
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
  }, [repository]);

  if (loading)
    return (
      <Loading>
        <h1>Carregando</h1> 
      </Loading>
    );

  return (
    <Container>

    <BackButton to={'/'}>
    <FaArrowLeft color="#000" size={35}/>
    </BackButton>

      <Owner>
        {actualRepository.owner && (
          <>
            <img src={actualRepository.owner.avatar_url} alt={actualRepository.owner.login} />
            <h1>{actualRepository.name}</h1>
            <p>{actualRepository.description}</p>
          </>
        )}
      </Owner>
    </Container>
  );
};

export default Repository;
