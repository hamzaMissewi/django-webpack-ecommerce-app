import {useState} from 'react';

function Converter() {
    const [value, setValue] = useState<number | undefined>(undefined);
    const [origin, setOrigin] = useState<string | undefined>(undefined);

    const isDisabled = (base: string) => (origin !== undefined && origin !== base);

    const updateValue = (baseName: string, base: number) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
                setValue(undefined);
                setOrigin(undefined);
            } else {
                const newValue = parseInt(e.target.value, base);
                setValue(isNaN(newValue) ? value : newValue);
                setOrigin(baseName);
            }
        };

    return (
        <div className="Converter">
            <label>
                Decimal:
                <input type="text" value={value?.toString(10) || ""} onChange={updateValue("decimal", 10)}
                       disabled={isDisabled("decimal")}/>
            </label>
            <label>
                Hexadecimal:
                <input type="text" value={value?.toString(16) || ""} onChange={updateValue("hex", 16)}
                       disabled={isDisabled("hex")}/>
            </label>
            <label>
                Binary:
                <input type="text" value={value?.toString(2) || ""} onChange={updateValue("binary", 2)}
                       disabled={isDisabled("binary")}/>
            </label>
        </div>
    );
}

export default Converter;