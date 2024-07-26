import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { TextField } from "@material-ui/core";
import "./ViaCepTable.css"; // Importa o arquivo CSS

const ViaCepTable = () => {
  const [cepData, setCepData] = useState(null);
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCepData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        setCepData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do CEP", error);
      } finally {
        setLoading(false);
      }
    };

    if (cep) {
      fetchCepData();
    }
  }, [cep]);

  const handleChange2 = (event) => {
    setCep(event.target.value);
  };

  return (
    <div className="via-cep-container">
      <div className="via-cep-input">
        <InputMask mask="99999-999" value={cep} onChange={handleChange2}>
          {() => (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Insira um CEP"
            />
          )}
        </InputMask>
      </div>
      <div className="table-container">
        {loading ? (
          <p className="loading">Carregando...</p>
        ) : (
          cepData && (
            <table>
              <thead>
                <tr>
                  <th>CEP</th>
                  <th>Logradouro</th>
                  <th>Cidade</th>
                  <th>Bairro</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{cepData.cep}</td>
                  <td>{cepData.logradouro}</td>
                  <td>{cepData.localidade}</td>
                  <td>{cepData.bairro}</td>
                  <td>{cepData.uf}</td>
                </tr>
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};

export default ViaCepTable;
