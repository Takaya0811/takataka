'use client';

import { useState } from 'react';

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

interface GoalManagerProps {
  goals: Goal[];
  onAdd: (title: string, description: string, deadline: string) => void;
  onUpdate: (id: string, title: string, description: string, deadline: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GoalManager({ goals, onAdd, onUpdate, onToggle, onDelete }: GoalManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: ''
  });
  const [editGoal, setEditGoal] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const handleAdd = () => {
    if (newGoal.title.trim() && newGoal.deadline) {
      onAdd(newGoal.title.trim(), newGoal.description.trim(), newGoal.deadline);
      setNewGoal({ title: '', description: '', deadline: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setEditGoal({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline
    });
  };

  const handleUpdate = () => {
    if (editingId && editGoal.title.trim() && editGoal.deadline) {
      onUpdate(editingId, editGoal.title.trim(), editGoal.description.trim(), editGoal.deadline);
      setEditingId(null);
      setEditGoal({ title: '', description: '', deadline: '' });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewGoal({ title: '', description: '', deadline: '' });
    setEditGoal({ title: '', description: '', deadline: '' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  const isOverdue = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">目標管理</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          目標を追加
        </button>
      </div>

      {/* 新規追加フォーム */}
      {isAdding && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">新しい目標を追加</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                目標タイトル
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="例: JavaScript をマスターする"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                詳細説明
              </label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="目標の詳細や達成方法を記入してください"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                期限
              </label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
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

      {/* 目標一覧 */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            まだ目標が設定されていません。「目標を追加」ボタンから追加してください。
          </p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
              {editingId === goal.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      目標タイトル
                    </label>
                    <input
                      type="text"
                      value={editGoal.title}
                      onChange={(e) => setEditGoal({ ...editGoal, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      詳細説明
                    </label>
                    <textarea
                      value={editGoal.description}
                      onChange={(e) => setEditGoal({ ...editGoal, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      期限
                    </label>
                    <input
                      type="date"
                      value={editGoal.deadline}
                      onChange={(e) => setEditGoal({ ...editGoal, deadline: e.target.value })}
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
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => onToggle(goal.id)}
                        className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium ${goal.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          {goal.title}
                        </h3>
                        {goal.description && (
                          <p className={`text-sm mt-1 ${goal.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {goal.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(goal)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => onDelete(goal.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm px-2 py-1 rounded ${
                      goal.completed 
                        ? 'bg-green-100 text-green-800' 
                        : isOverdue(goal.deadline)
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {goal.completed ? '完了' : isOverdue(goal.deadline) ? '期限切れ' : '進行中'}
                    </span>
                    <span className="text-sm text-gray-600">
                      期限: {formatDate(goal.deadline)}
                    </span>
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