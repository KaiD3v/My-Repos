import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "../../styles";
import {} from "react-icons";
import { useCallback, useState } from "react";
import api from "../../api/api.config";

const Main = () => {
  const [newRepo, setNewRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositeries] = useState([]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          const res = await api.get(`/repos/${newRepo}`);

          const data = {
            name: res.data.full_name
          };

          setRepositeries([...repositories, data]);
          setNewRepo("");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My Repos
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
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
                <DeleteButton onClick={() => {}}>
                  <FaTrash size={14}/>
                </DeleteButton>
                {repo.name}
              </span>
              <a href="">
                <FaBars size={20} />
              </a>
            </li>
          )}
      </List>
    </Container>
  );
};

export default Main;
