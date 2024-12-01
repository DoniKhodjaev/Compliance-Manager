import { useState } from "react";
import type { SwiftMessage } from "../types";
import { Eye, Trash2 } from "lucide-react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { useTranslation } from "react-i18next";

interface MessageListProps {
  messages: SwiftMessage[];
  onViewMessage: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onStatusChange: (id: string, status: SwiftMessage["status"]) => void;
}

export function MessageList({
  messages = [],
  onViewMessage,
  onDeleteMessage,
}: MessageListProps) {
  const { t } = useTranslation();
  const [messageToDelete, setMessageToDelete] = useState<SwiftMessage | null>(
    null,
  );

  const handleDeleteClick = (e: React.MouseEvent, message: SwiftMessage) => {
    e.stopPropagation();
    setMessageToDelete(message);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      onDeleteMessage(messageToDelete.id);
      setMessageToDelete(null);
    }
  };

  const handleRowClick = (message: SwiftMessage) => {
    onViewMessage(message.id);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const renderStatus = (status: SwiftMessage['status']) => {
    switch (status) {
      case 'flagged':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {t('flagged')}
          </span>
        );
      case 'processing':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            {t('needsReview')}
          </span>
        );
      case 'clear':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {t('clear')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('reference')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('sender')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('receiver')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <tr
                    key={message.id}
                    onClick={() => handleRowClick(message)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {message.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {message.transactionRef}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {message.sender.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {message.receiver.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {message.currency}{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(parseFloat(message.amount))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatus(message.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div 
                        className="flex items-center space-x-3"
                        onClick={handleActionClick}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewMessage(message.id);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          title={t('viewDetails')}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, message)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          title={t('deleteMessage')}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-300"
                  >
                    {t('noMessagesFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        message={messageToDelete!}
        isOpen={!!messageToDelete}
        onClose={() => setMessageToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
