
'use client';

import { useState, useEffect } from 'react';
import SkillRadarChart from './components/SkillRadarChart';
import GoalManager from './components/GoalManager';
import SkillManager from './components/SkillManager';
import ExperienceManager from './components/ExperienceManager';

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const savedSkills = localStorage.getItem('portfolio-skills');
    const savedGoals = localStorage.getItem('portfolio-goals');
    const savedExperiences = localStorage.getItem('portfolio-experiences');

    if (savedSkills) setSkills(JSON.parse(savedSkills));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedExperiences) setExperiences(JSON.parse(savedExperiences));
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('portfolio-experiences', JSON.stringify(experiences));
  }, [experiences]);

  const addSkill = (name: string, level: number) => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name,
      level
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, name: string, level: number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, name, level } : skill
    ));
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addGoal = (title: string, description: string, deadline: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      description,
      deadline,
      completed: false
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, title: string, description: string, deadline: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, title, description, deadline } : goal
    ));
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const addExperience = (title: string, company: string, period: string, description: string) => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title,
      company,
      period,
      description
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: string, title: string, company: string, period: string, description: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, title, company, period, description } : exp
    ));
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const tabs = [
    { id: 'dashboard', name: 'ダッシュボード', icon: '📊' },
    { id: 'goals', name: '目標管理', icon: '🎯' },
    { id: 'skills', name: 'スキル管理', icon: '💡' },
    { id: 'experience', name: '経歴管理', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            ポートフォリオ管理アプリ
          </h1>
          <p className="text-gray-600 mt-2">
            あなたの目標、スキル、経歴を管理・可視化しましょう
          </p>
        </div>
      </header>

      {/* ナビゲーション */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 統計カード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">目標数</p>
                    <p className="text-2xl font-bold text-gray-800">{goals.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">スキル数</p>
                    <p className="text-2xl font-bold text-gray-800">{skills.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">経歴数</p>
                    <p className="text-2xl font-bold text-gray-800">{experiences.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* スキルレーダーチャート */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">スキルレベル</h2>
              <SkillRadarChart skills={skills} />
            </div>

            {/* 最近の目標と経歴 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">最近の目標</h2>
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="mb-3 p-3 bg-gray-50 rounded">
                    <h3 className="font-medium text-gray-800">{goal.title}</h3>
                    <p className="text-sm text-gray-600">{goal.deadline}まで</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                      goal.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {goal.completed ? '完了' : '進行中'}
                    </span>
                  </div>
                ))}
                {goals.length === 0 && (
                  <p className="text-gray-500">まだ目標が設定されていません。</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">最近の経歴</h2>
                {experiences.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="mb-3 p-3 bg-gray-50 rounded">
                    <h3 className="font-medium text-gray-800">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.company} | {exp.period}</p>
                  </div>
                ))}
                {experiences.length === 0 && (
                  <p className="text-gray-500">まだ経歴が追加されていません。</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <GoalManager
            goals={goals}
            onAdd={addGoal}
            onUpdate={updateGoal}
            onToggle={toggleGoal}
            onDelete={deleteGoal}
          />
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <SkillManager
              skills={skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onDelete={deleteSkill}
            />
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">スキルレーダーチャート</h2>
              <SkillRadarChart skills={skills} />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <ExperienceManager
            experiences={experiences}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
          />
        )}
      </main>
    </div>
  );
}
