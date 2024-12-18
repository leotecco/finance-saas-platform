import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { CategoryTooltip } from "@/components/category-tooltip";
import { formatPercentage } from "@/lib/utils";

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, index: number) => {
                  return (
                    <li
                      className="flex items-center space-x-2"
                      key={`item-${index}`}
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <div className="space-x-1">
                        <span className="text-sm text-muted-foreground">
                          {entry.value}
                        </span>
                        <span className="text-sm">
                          {formatPercentage(entry.payload.percent * 100)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        />

        <Tooltip content={<CategoryTooltip />} />

        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
