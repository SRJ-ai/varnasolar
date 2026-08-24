import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#F4F3EE',
    color: '#1B1B1B'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2pt solid #FF4A00',
    paddingBottom: 20,
    marginBottom: 30
  },
  logo: {
    width: 140
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#FF4A00',
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
    borderBottom: '1pt solid #1B1B1B',
    paddingBottom: 5
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    border: '1pt solid #D1D1D1',
    padding: 15
  },
  cardLabel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
    textTransform: 'uppercase'
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 700
  },
  cardValueOrange: {
    fontSize: 20,
    fontWeight: 700,
    color: '#FF4A00'
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: '1pt solid #D1D1D1',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#666666'
  }
});

interface QuotePDFProps {
  systemSizeKW: number;
  grossCostINR: number;
  centralSubsidyINR: number;
  netCostINR: number;
  monthlySavingsINR: number;
  paybackPeriodYears: number;
  lifetimeSavingsINR30Yr: number;
  co2OffsetTonnes30Yr: number;
  connectionType: string;
}

export const QuotePDF: React.FC<QuotePDFProps> = ({
  systemSizeKW,
  grossCostINR,
  centralSubsidyINR,
  netCostINR,
  monthlySavingsINR,
  paybackPeriodYears,
  lifetimeSavingsINR30Yr,
  co2OffsetTonnes30Yr,
  connectionType
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>SOLAR PROPOSAL</Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: '#666' }}>Generated automatically by Varna Solar EPC</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>System Specification</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>System Capacity</Text>
          <Text style={styles.cardValue}>{systemSizeKW} kWp</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Connection Type</Text>
          <Text style={styles.cardValue}>{connectionType.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Financials & Subsidy</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Gross System Cost</Text>
          <Text style={styles.cardValue}>Rs. {grossCostINR.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>{connectionType === 'residential' ? 'PM Surya Ghar Subsidy' : 'Accelerated Depreciation'}</Text>
          <Text style={styles.cardValueOrange}>Rs. {centralSubsidyINR.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Net Cost to Customer</Text>
          <Text style={styles.cardValue}>Rs. {netCostINR.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Monthly Bill Reduction</Text>
          <Text style={styles.cardValue}>Rs. {monthlySavingsINR.toLocaleString('en-IN')}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Return on Investment</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Payback Period</Text>
          <Text style={styles.cardValueOrange}>{paybackPeriodYears} Years</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>30-Year Net Savings</Text>
          <Text style={styles.cardValue}>Rs. {lifetimeSavingsINR30Yr.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>CO2 Offset (30 Yrs)</Text>
          <Text style={styles.cardValue}>{co2OffsetTonnes30Yr} Tonnes</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Varna Solar Pvt. Ltd. | 1800 123 4567 | www.varnasolar.in</Text>
        <Text>Authorised Waaree Channel Partner</Text>
      </View>
    </Page>
  </Document>
);
