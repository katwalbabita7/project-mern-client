import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const DataTable = ({ children, className = "" }: IProps) => {
  return (
    <div className={`w-full overflow-x-auto rounded-md border border-gray-200 shadow-sm ${className}`}>
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  );
};

// Sub components
const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
    {children}
  </thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const TableRow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tr className={`hover:bg-gray-50 transition-colors ${className}`}>
    {children}
  </tr>
);

const TableHead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th className={`px-4 py-3 font-semibold ${className}`}>{children}</th>
);

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={`px-4 py-3 ${className}`}>{children}</td>;

export { DataTable, TableHeader, TableBody, TableRow, TableHead, TableCell };
export default DataTable;