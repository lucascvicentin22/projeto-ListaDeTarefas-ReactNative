import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ListaTarefas = () => {
  // Lista das tarefas que serão exibidas na tela
  const [tarefas, setTarefas] = useState([]);

  // Variável que vai armazenar o texto da nova tarefa do usuário
  const [tarefa, setTarefa] = useState('');

  const [tarefaConcluida, setTarefaConcluida] = useState(null);

  const adicionarTarefa = () => {
    if (tarefa) {
      const novaTarefa = {
        id: tarefas.length + 1,
        descricao: tarefa,
        status: 'aberta',
      };

      setTarefas([...tarefas, novaTarefa]);
      setTarefa('');
    }
  };

  const concluirTarefa = (id) => {
    const novasTarefas = tarefas.map((t) =>
      t.id === id ? { ...t, status: 'concluido' } : t
    );

    setTarefas(novasTarefas);
  };

  const removerTarefa = (id) => {
    const novasTarefas = tarefas.filter((t) => t.id !== id);

    setTarefas(novasTarefas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LISTA DE TAREFAS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="DIGITE UMA TAREFA..."
          onChangeText={(texto) => setTarefa(texto)}
          value={tarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.textoBotao}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemTarefa}>
            {item.status === 'aberta' ? (
              <Text style={styles.textoTarefa}>{item.descricao}</Text>
            ) : (
              <Text style={styles.textoTarefaConcluida}>{item.descricao}</Text>
            )}
            {item.status === 'aberta' ? (
              <View style={styles.botoesContainer}>
                <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                  <Text style={styles.botaoExcluir}>REMOVER</Text>
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
                  <Text style={styles.botaoConcluir}>CONCLUIR</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 35,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  botaoAdicionar: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoTarefa: {
    flex: 1,
  },
  botaoExcluir: {
    color: 'red',
    marginLeft: 10,
  },
  botaoConcluir: {
    color: 'green',
    marginLeft: 10,
  },
  textoTarefaConcluida: {
    flex: 1,
    textDecorationLine: 'line-through',
  },
});

export default ListaTarefas;
