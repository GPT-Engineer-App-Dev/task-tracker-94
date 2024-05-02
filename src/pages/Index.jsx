import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      <Button onClick={addTask} mt={2} colorScheme="blue">Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Box as={task.isCompleted ? 's' : 'span'}>{task.text}</Box>
            <Box>
              <IconButton
                icon={<FaCheck />}
                onClick={() => toggleCompletion(task.id)}
                colorScheme={task.isCompleted ? 'green' : 'gray'}
                aria-label="Complete task"
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;