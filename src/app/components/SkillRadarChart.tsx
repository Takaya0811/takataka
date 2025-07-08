'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillRadarChartProps {
  skills: Skill[];
}

export default function SkillRadarChart({ skills }: SkillRadarChartProps) {
  if (skills.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>スキルを追加するとレーダーチャートが表示されます</p>
      </div>
    );
  }

  const data = skills.map(skill => ({
    skill: skill.name,
    level: skill.level
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fontSize: 12, fill: '#666' }}
            className="text-xs"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 10]} 
            tick={{ fontSize: 10, fill: '#666' }}
          />
          <Radar
            name="スキルレベル"
            dataKey="level"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}