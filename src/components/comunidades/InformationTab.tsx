import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Page A",
    Juros: 4000,
    Dividendos: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Juros: 3000,
    Dividendos: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Juros: 4000,
    Dividendos: 9800,
    amt: 2290,
  },
];

const Chart = () => {
  return (
    <LineChart
      width={400}
      height={400}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="Dividendos" stroke="#82ca9d" />
      <Line
        type="monotone"
        dataKey="Juros"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

interface InformationCardProps {
  title: string;
}

const InformationCard = ({ title }: InformationCardProps) => {
  return (
    <Card bg="gray.500" variant="filled">
      <CardBody>
        <Text color="white">{title}</Text>
      </CardBody>
    </Card>
  );
};

export function InformationTab() {
  return (
    <VStack alignItems="center">
      <Flex>
        <StarIcon mr="2" color="whatsapp.500" />
        <Heading size="sm" color="white">
          Nota da turma: 7.7 - Pode investir !{" "}
        </Heading>
      </Flex>

      <Chart />

      <HStack gap={2}>
        <InformationCard title="COT: R$ 20,00" />

        <InformationCard title="DY: R$ 20,00" />
      </HStack>
    </VStack>
  );
}
