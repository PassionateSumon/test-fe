import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    films: [],
    filterComponents: {
        category: [],
        language: [],
        actor: []
    },
    flimInfo: {},
    flimAllActors: [],
    total: 0,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null
}

const BASE_URL = "http://localhost:3030"

export const getListOfAllFilmsWithPagination = createAsyncThunk("/all/films", async ({ page, limit = 10, fData }, { rejectWithValue }) => {
    try {
        // console.log("here")
        // // console.log(search, typeof search)
        // const search = {
        //     ...(fData.category) && {category: fData.category},
        //     ...(fData.language) && {language: fData.language},
        //     ...(fData.release_year > 0) && {release_year: fData.release_year},
        //     ...( fData.actor) && {actor: fData.actor}
        // }
        // // console.log(search, typeof search)
        // let params = {
        //     page,
        //     limit,
        //     search
        // }
        // console.log(params);
        // console.log(params)
        // let param = ''
        // if(page >= 0){
        //     param += `page=${page}`
        // } else if( limit >= 0){
        //      param += `limit=${limit}`
        // }
        // const param = `page=${page}&limit=${limit}&search=${JSON.stringify(search)}`
        const res = await axios.get(`${BASE_URL}/films?page=${page}&limit=${limit}&search=${JSON.stringify(fData)}`)
        // console.log(res.data)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllFilterItems = createAsyncThunk("/all/filterComponents", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/filter-components`)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getFilmInfo = createAsyncThunk("/film/info", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/flim-info/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getFilmActor = createAsyncThunk("/film/actor", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/flim-actors/${id}`)
        // console.log(res.data)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const FilmSlice = createSlice({
    name: "film",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },

        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListOfAllFilmsWithPagination.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getListOfAllFilmsWithPagination.fulfilled, (state, { payload }) => {
                state.total = payload.data.total
                state.films = payload.data.films
                state.totalPages = payload.data.totalPages
                state.loading = false
                state.error = null
            })
            .addCase(getListOfAllFilmsWithPagination.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(getAllFilterItems.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllFilterItems.fulfilled, (state, { payload }) => {
                // console.log(payload)
                state.filterComponents = payload?.data
                state.loading = false
                state.error = null
            })
            .addCase(getAllFilterItems.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(getFilmInfo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getFilmInfo.fulfilled, (state, { payload }) => {
                // console.log(payload)
                state.flimInfo = payload?.data
                state.loading = false
                state.error = null
            })
            .addCase(getFilmInfo.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(getFilmActor.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getFilmActor.fulfilled, (state, { payload }) => {
                // console.log(payload)
                state.flimAllActors = payload?.data.flimActors
                state.loading = false
                state.error = null
            })
            .addCase(getFilmActor.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export const { setPage, clearError } = FilmSlice.actions
export default FilmSlice