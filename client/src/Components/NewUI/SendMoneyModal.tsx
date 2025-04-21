import React from 'react'

const SendMoneyModal = ({
    show,
    onClose
  }: {
    show: boolean;
    onClose: () => void;
  }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
        <div className="paper-container p-8 rounded-sm w-[480px] relative shadow-paper-deep">
          <div className="absolute top-4 right-4 w-8 h-8 bg-red-100/50 rounded-full" />
          <h3 className="text-2xl font-serif text-amber-900 mb-6 border-b border-amber-200 pb-2">
            💰 Money Transfer
          </h3>
          <div className="space-y-4">
            <div>
              <label className="paper-input-label">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="paper-money-input pl-8"
                />
                <span className="absolute left-3 top-3 text-amber-700">$</span>
              </div>
            </div>
            <div>
              <label className="paper-input-label">To Recipient</label>
              <input
                type="text"
                placeholder="Name or @username"
                className="paper-input"
              />
            </div>
            <div>
              <label className="paper-input-label">Note</label>
              <textarea
                placeholder="Add a secret message..."
                className="paper-input h-24"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="paper-cancel-button">
              Cancel
            </button>
            <button className="paper-send-money-button">
              Seal & Send
            </button>
          </div>
        </div>
      </div>
    );
  };

export default SendMoneyModal