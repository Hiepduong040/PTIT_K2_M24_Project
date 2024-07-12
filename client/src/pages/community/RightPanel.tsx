import React from 'react';

export default function RightPanel() {
  const contacts = [
    { name: 'Trịnh Khắc Hưng', status: 'online' },
    { name: 'Đỗ Ngọc Bến', status: 'online' },
    { name: 'Tình Nguyễn Chí', status: 'online' },
    { name: 'Thiện Nguyễn', status: 'online' },
    { name: 'Đỗ Thế Nguyên', status: 'offline' },
    { name: 'Trần Nguyễn Hoàng Giang', status: 'online' },
  ];

  return (
    <div className="fixed right-0 top-10 w-64 h-full bg-gray-100 shadow-md p-4">
      <div className="mb-6">
        <div className="font-semibold text-lg mb-2">Birthday</div>
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            🎁
          </div>
          <div>Today is Ngoc Bich's birthday.</div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg mb-2">Contact</div>
        <div className="space-y-2">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={`https://via.placeholder.com/40?text=${contact.name.charAt(0)}`}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full"
                />
                {contact.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>{contact.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
