'use client';

import { useState } from 'react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceManagerProps {
  experiences: Experience[];
  onAdd: (title: string, company: string, period: string, description: string) => void;
  onUpdate: (id: string, title: string, company: string, period: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function ExperienceManager({ experiences, onAdd, onUpdate, onDelete }: ExperienceManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: ''
  });
  const [editExperience, setEditExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: ''
  });

  const handleAdd = () => {
    if (newExperience.title.trim() && newExperience.company.trim() && newExperience.period.trim()) {
      onAdd(
        newExperience.title.trim(),
        newExperience.company.trim(),
        newExperience.period.trim(),
        newExperience.description.trim()
      );
      setNewExperience({ title: '', company: '', period: '', description: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setEditExperience({
      title: experience.title,
      company: experience.company,
      period: experience.period,
      description: experience.description
    });
  };

  const handleUpdate = () => {
    if (editingId && editExperience.title.trim() && editExperience.company.trim() && editExperience.period.trim()) {
      onUpdate(
        editingId,
        editExperience.title.trim(),
        editExperience.company.trim(),
        editExperience.period.trim(),
        editExperience.description.trim()
      );
      setEditingId(null);
      setEditExperience({ title: '', company: '', period: '', description: '' });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewExperience({ title: '', company: '', period: '', description: '' });
    setEditExperience({ title: '', company: '', period: '', description: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">経歴管理</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          経歴を追加
        </button>
      </div>

      {/* 新規追加フォーム */}
      {isAdding && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">新しい経歴を追加</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  役職・職種
                </label>
                <input
                  type="text"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                  placeholder="例: フロントエンドエンジニア"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  会社・組織名
                </label>
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="例: 株式会社サンプル"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                期間
              </label>
              <input
                type="text"
                value={newExperience.period}
                onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                placeholder="例: 2022年4月 - 2024年3月"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                詳細説明
              </label>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="担当した業務や成果、学んだことなどを記入してください"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

      {/* 経歴一覧 */}
      <div className="space-y-6">
        {experiences.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            まだ経歴が追加されていません。「経歴を追加」ボタンから追加してください。
          </p>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
              {editingId === experience.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        役職・職種
                      </label>
                      <input
                        type="text"
                        value={editExperience.title}
                        onChange={(e) => setEditExperience({ ...editExperience, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        会社・組織名
                      </label>
                      <input
                        type="text"
                        value={editExperience.company}
                        onChange={(e) => setEditExperience({ ...editExperience, company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      期間
                    </label>
                    <input
                      type="text"
                      value={editExperience.period}
                      onChange={(e) => setEditExperience({ ...editExperience, period: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      詳細説明
                    </label>
                    <textarea
                      value={editExperience.description}
                      onChange={(e) => setEditExperience({ ...editExperience, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{experience.title}</h3>
                      <p className="text-blue-600 font-medium">{experience.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{experience.period}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(experience)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => onDelete(experience.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  {experience.description && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {experience.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}