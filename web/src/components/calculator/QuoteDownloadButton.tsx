import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { QuotePDF } from './QuotePDF';

interface QuoteDownloadButtonProps {
  results: {
    systemSizeKW: number;
    grossCostINR: number;
    centralSubsidyINR: number;
    netCostINR: number;
    monthlySavingsINR: number;
    paybackPeriodYears: number;
    lifetimeSavingsINR30Yr: number;
    co2OffsetTonnes30Yr: number;
  };
  connectionType: string;
}

const QuoteDownloadButton: React.FC<QuoteDownloadButtonProps> = ({ results, connectionType }) => {
  return (
    <PDFDownloadLink
      document={
        <QuotePDF
          systemSizeKW={results.systemSizeKW}
          grossCostINR={results.grossCostINR}
          centralSubsidyINR={results.centralSubsidyINR}
          netCostINR={results.netCostINR}
          monthlySavingsINR={results.monthlySavingsINR}
          paybackPeriodYears={results.paybackPeriodYears}
          lifetimeSavingsINR30Yr={results.lifetimeSavingsINR30Yr}
          co2OffsetTonnes30Yr={results.co2OffsetTonnes30Yr}
          connectionType={connectionType}
        />
      }
      fileName={`VarnaSolar_Quote_${results.systemSizeKW}kW.pdf`}
      className="btn-outline-premium shrink-0 !border-ink !text-ink hover:!bg-ink hover:!text-paper text-center justify-center py-4 w-full"
    >
      {({ loading }) => (loading ? 'Generating PDF Engine...' : 'Download PDF Proposal')}
    </PDFDownloadLink>
  );
};

export default QuoteDownloadButton;
