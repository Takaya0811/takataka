'use client';

import { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillManagerProps {
  skills: Skill[];
  onAdd: (name: string, level: number) => void;
  onUpdate: (id: string, name: string, level: number) => void;
  onDelete: (id: string) => void;
}

export default function SkillManager({ skills, onAdd, onUpdate, onDelete }: SkillManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(5);
  const [editSkillName, setEditSkillName] = useState('');
  const [editSkillLevel, setEditSkillLevel] = useState(5);

  const handleAdd = () => {
    if (newSkillName.trim()) {
      onAdd(newSkillName.trim(), newSkillLevel);
      setNewSkillName('');
      setNewSkillLevel(5);
      setIsAdding(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditSkillName(skill.name);
    setEditSkillLevel(skill.level);
  };

  const handleUpdate = () => {
    if (editingId && editSkillName.trim()) {
      onUpdate(editingId, editSkillName.trim(), editSkillLevel);
      setEditingId(null);
      setEditSkillName('');
      setEditSkillLevel(5);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewSkillName('');
    setNewSkillLevel(5);
    setEditSkillName('');
    setEditSkillLevel(5);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">スキル管理</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          スキルを追加
        </button>
      </div>

      {/* 新規追加フォーム */}
      {isAdding && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">新しいスキルを追加</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                スキル名
              </label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="例: JavaScript, Python, デザイン"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                レベル (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-gray-800 min-w-[2rem]">
                  {newSkillLevel}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                追加
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* スキル一覧 */}
      <div className="space-y-4">
        {skills.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            まだスキルが追加されていません。「スキルを追加」ボタンから追加してください。
          </p>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
              {editingId === skill.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      スキル名
                    </label>
                    <input
                      type="text"
                      value={editSkillName}
                      onChange={(e) => setEditSkillName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      レベル (1-10)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={editSkillLevel}
                        onChange={(e) => setEditSkillLevel(parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-lg font-medium text-gray-800 min-w-[2rem]">
                        {editSkillLevel}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                      保存
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{skill.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {skill.level}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => onDelete(skill.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}