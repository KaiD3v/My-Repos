import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  SubmitButton,
  List,
  DeleteButton
} from "./styles";
import { useCallback, useEffect, useState } from "react";
import api from "../../api/api.config";

const Main = () => {
  const [newRepo, setNewRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [alert, setAlert] = useState(false);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          if (newRepo === "") {
            throw new Error("É necessário indicar um repositório.");
          }

          const res = await api.get(`/repos/${newRepo}`);

          const hasRepo = repositories.find(repo => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositório duplicado.");
          }

          const data = {
            name: res.data.full_name
          };

          setRepositories([...repositories, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  const handleDelete = useCallback(
    repo => {
      const find = repositories.filter(r => r.name !== repo);
      setRepositories(find);
    },
    [repositories]
  );

  // get
  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage) {
      setRepositories(JSON.parse(repoStorage));
    }
  }, []);

  // save
  useEffect(
    () => {
      if (repositories.length > 0) {
        localStorage.setItem("repos", JSON.stringify(repositories));
      }
    },
    [repositories]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My Repos
      </h1>
      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={e => {
            setNewRepo(e.target.value);
            setAlert(false);
          }}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading
            ? <FaSpinner color="white" size={14} />
            : <FaPlus color="white" size={14} />}
        </SubmitButton>
      </Form>

      <List>
        {repositories &&
          repositories.map((repo, index) =>
            <li key={index}>
              <span>
                <DeleteButton
                  value={repo.name}
                  onClick={() => {
                    handleDelete(repo.name);
                    setAlert(false);
                  }}
                >
                  <FaTrash size={14} />
                </DeleteButton>
                {repo.name}
              </span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                <FaBars size={20} />
                </Link>
            </li>
          )}
      </List>
    </Container>
  );
};

export default Main;
