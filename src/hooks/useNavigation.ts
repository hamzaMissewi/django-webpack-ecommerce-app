import {useCallback, useEffect, useMemo, useRef} from 'react';
import {NavigateOptions} from 'react-router';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

export function useNavigationHook() {
    const realNavigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const nextLocation = useRef<Partial<Location> | null>(null);
    const currentSearchParams = useRef(searchParams);
    const currentLocation = useRef(location);

    useEffect(() => {
        nextLocation.current = null;
        currentLocation.current = location;
    }, [location]);

    useEffect(() => {
        currentSearchParams.current = searchParams;
    }, [searchParams]);

    const navigate = useCallback((newLocation: Partial<Location>, options?: NavigateOptions & { merge: boolean }) => {
        if (options?.merge) {
            if (nextLocation.current) {
                newLocation = {...nextLocation.current, ...newLocation};
            } else {
                newLocation = {...currentLocation.current, ...newLocation};
            }
        }
        // newLocation.origin = newLocation
        nextLocation.current = newLocation;
        realNavigate(newLocation, options);
    }, []);

    const changeSearchParams = useCallback((params: { [keys: string]: string | null | undefined }, replace = true) => {
        const initSearchParams = currentSearchParams.current.toString();
        for (const key in params) {
            const value = params[key];
            if (!value) {
                currentSearchParams.current.delete(key);
            } else {
                currentSearchParams.current.set(key, value);
            }
        }
        const newSearchParams = currentSearchParams.current.toString();
        if (newSearchParams !== initSearchParams || replace) {
            navigate({search: newSearchParams}, {replace, merge: true});
        }
    }, []);

    const searchParamsObj = useMemo(() => {
        const result: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
            result[key] = value;
        }
        return result;
    }, [searchParams]);

    return {
        searchParams: searchParamsObj,
        navigate,
        changeSearchParams,
        location,
    };
}
