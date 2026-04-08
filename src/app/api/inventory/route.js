import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const inventoryPath = path.join(process.cwd(), 'Tech_Inventory.json');
    const fileContent = await readFile(inventoryPath, 'utf-8');
    const items = JSON.parse(fileContent);

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load inventory data.' },
      { status: 500 }
    );
  }
}