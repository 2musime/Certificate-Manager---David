export const initializeDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('certificate-db', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('certificates')) {
        const store = db.createObjectStore('certificates', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('by-date', 'validFrom');
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const getCertificates = async () => {
  const db = await initializeDB();
  return new Promise<any[]>((resolve, reject) => {
    const transaction = db.transaction('certificates', 'readonly');
    const store = transaction.objectStore('certificates');
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const deleteCertificate = async (id: IDBValidKey | IDBKeyRange) => {
  const db = await initializeDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('certificates', 'readwrite');
    const store = transaction.objectStore('certificates');
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const addCertificate = async (certificate: { supplier: string; certificateType: string; validFrom: string; validTo: string; pdfFile: string|null; }) => {
  const db = await initializeDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('certificates', 'readwrite');
    const store = transaction.objectStore('certificates');
    const request = store.add(certificate);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const updateCertificate = async (certificate: any, id:number) => {
  const db = await initializeDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('certificates', 'readwrite');
    const store = transaction.objectStore('certificates');
    const request = store.put({...certificate, id});

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};
