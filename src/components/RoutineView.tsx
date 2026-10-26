/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Sun, Moon, Info, X } from 'lucide-react';
import { RoutineStep, Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface RoutineViewProps {
  routines: RoutineStep[];
  onToggleStep: (id: string, timeOfDay: 'morning' | 'evening') => void;
  onAddStep: (step: Omit<RoutineStep, 'id' | 'completedMorning' | 'completedEvening'>) => void;
  onDeleteStep: (id: string) => void;
  lang: Language;
}

export const RoutineView: React.FC<RoutineViewProps> = ({
  routines,
  onToggleStep,
  onAddStep,
  onDeleteStep,
  lang
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state for adding custom step
  const [stepTitle, setStepTitle] = useState('');
  const [stepProduct, setStepProduct] = useState('');
  const [stepCategory, setStepCategory] = useState<'cleanse' | 'hydrate' | 'treat' | 'moisturize' | 'protect'>('cleanse');
  const [stepTime, setStepTime] = useState<'morning' | 'evening' | 'both'>('morning');

  // Filter steps applicable to the active tab
  const filteredSteps = routines.filter(step => {
    if (activeTab === 'morning') {
      return step.timeOfDay === 'morning' || step.timeOfDay === 'both';
    } else {
      return step.timeOfDay === 'evening' || step.timeOfDay === 'both';
    }
  });

  const totalSteps = filteredSteps.length;
  const completedSteps = filteredSteps.filter(s => 
    activeTab === 'morning' ? s.completedMorning : s.completedEvening
  ).length;

  const percent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const handleCreateStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepTitle.trim()) return;

    onAddStep({
      title: stepTitle.trim(),
      productName: stepProduct.trim() || undefined,
      category: stepCategory,
      timeOfDay: stepTime,
    });

    setStepTitle('');
    setStepProduct('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title & Add Step Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-6">
        <div className="space-y-1 text-left rtl:text-right">
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16251E]">
            {t.routine.title}
          </h1>
          <p className="text-sm text-[#5B6760]">
            {t.routine.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.routine.addStepBtn}</span>
        </button>
      </div>

      {/* Routine Banner with Luxury Photography */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-[#E8E1D5] rounded-3xl overflow-hidden shadow-xs">
        <div className="md:col-span-8 p-6 sm:p-8 space-y-5 text-left rtl:text-right flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#68766E]">
              {activeTab === 'morning' ? t.routine.morningTab : t.routine.eveningTab} Progress
            </span>
            <div className="flex items-center gap-4">
              <span className="font-editorial text-4xl font-bold text-[#1B382B] tabular-nums">
                {percent}%
              </span>
              <div className="flex-1 max-w-xs bg-[#E5ECE7] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1B382B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-[#5D6B63]">
              {completedSteps} of {totalSteps} {activeTab === 'morning' ? 'morning' : 'evening'} steps completed today.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EBE3D7] text-xs text-[#637068] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1B382B] shrink-0" />
            <span>{t.routine.resetNote}</span>
          </div>
        </div>

        <div className="md:col-span-4 h-48 md:h-auto relative bg-[#ECE6DC]">
          <img
            src="/src/assets/images/skincare_routine_products_1793037796534.jpg"
            alt="Skincare essentials"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Morning vs Evening Segmented Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-[#F5F1E9] rounded-2xl border border-[#E8DFD1]">
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'morning'
                ? 'bg-white text-[#1B382B] shadow-xs font-semibold'
                : 'text-[#647169] hover:text-[#1B382B]'
            }`}
          >
            <Sun className="w-4 h-4 text-[#C5A880]" />
            <span>{t.routine.morningTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('evening')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'evening'
                ? 'bg-white text-[#1B382B] shadow-xs font-semibold'
                : 'text-[#647169] hover:text-[#1B382B]'
            }`}
          >
            <Moon className="w-4 h-4 text-[#4A6456]" />
            <span>{t.routine.eveningTab}</span>
          </button>
        </div>
      </div>

      {/* Routine Steps Checklist */}
      <div className="space-y-3">
        {filteredSteps.map((step, index) => {
          const isDone = activeTab === 'morning' ? step.completedMorning : step.completedEvening;

          return (
            <div
              key={step.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 text-left rtl:text-right ${
                isDone
                  ? 'bg-[#F5F8F6] border-[#D4E3D8]'
                  : 'bg-white border-[#E8E1D5] hover:border-[#CAD8CE]'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => onToggleStep(step.id, activeTab)}
                  className="mt-0.5 sm:mt-0 text-[#1B382B] hover:scale-110 transition-transform cursor-pointer shrink-0"
                  aria-label={`Mark ${step.title} complete in ${activeTab}`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-[#2E5844] fill-[#E5ECE7]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#BDC9C1] hover:text-[#1B382B]" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#798680] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EDE5DA]">
                      Step {index + 1} · {step.category}
                    </span>
                    {step.timeOfDay === 'both' && (
                      <span className="text-[9px] font-mono bg-[#F2EDE4] text-[#1B382B] px-1.5 py-0.5 rounded">
                        AM & PM
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-semibold mt-1 truncate ${
                      isDone ? 'line-through text-[#86928B]' : 'text-[#1F2B24]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  {step.productName && (
                    <p className="text-xs text-[#637069] mt-0.5 truncate">
                      {step.productName}
                    </p>
                  )}
                  {step.notes && (
                    <p className="text-[11px] text-[#7C8881] mt-0.5 italic">
                      {step.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {step.isCustom && (
                  <button
                    onClick={() => onDeleteStep(step.id)}
                    className="p-1.5 rounded-lg text-[#9B2C2C] hover:bg-[#FCE8E8] transition-colors cursor-pointer"
                    title="Delete custom step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredSteps.length === 0 && (
          <div className="bg-white border border-[#E8E1D5] rounded-2xl p-8 text-center text-xs text-[#717E77] space-y-2">
            <p>{t.routine.emptyRoutine}</p>
          </div>
        )}
      </div>

      {/* Add Step Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8DFD1] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left rtl:text-right space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-[#6E7B74] hover:text-[#1B382B]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-editorial text-2xl text-[#1B382B]">
              {t.routine.addStepTitle}
            </h3>

            <form onSubmit={handleCreateStep} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#45524B] mb-1">
                  {t.routine.stepTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Squalane Hydration Booster"
                  value={stepTitle}
                  onChange={e => setStepTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D7CEBF] rounded-xl text-xs text-[#1E2320] focus:ring-1 focus:ring-[#1B382B] focus:border-[#1B382B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#45524B] mb-1">
                  {t.routine.stepProductLabel}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% Pure Plant Squalane"
                  value={stepProduct}
                  onChange={e => setStepProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D7CEBF] rounded-xl text-xs text-[#1E2320] focus:ring-1 focus:ring-[#1B382B] focus:border-[#1B382B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#45524B] mb-1">
                    {t.routine.stepCategoryLabel}
                  </label>
                  <select
                    value={stepCategory}
                    onChange={e => setStepCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#D7CEBF] rounded-xl text-xs text-[#1E2320]"
                  >
                    <option value="cleanse">{t.routine.cleanseCat}</option>
                    <option value="hydrate">{t.routine.hydrateCat}</option>
                    <option value="treat">{t.routine.treatCat}</option>
                    <option value="moisturize">{t.routine.moisturizeCat}</option>
                    <option value="protect">{t.routine.protectCat}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#45524B] mb-1">
                    {t.routine.stepTimeLabel}
                  </label>
                  <select
                    value={stepTime}
                    onChange={e => setStepTime(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#D7CEBF] rounded-xl text-xs text-[#1E2320]"
                  >
                    <option value="morning">Morning (AM)</option>
                    <option value="evening">Evening (PM)</option>
                    <option value="both">{t.routine.bothTimes}</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EDE5DA] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#D6CDBC] rounded-xl text-xs font-medium text-[#4D5A52]"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39]"
                >
                  {t.common.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
